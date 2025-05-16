import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/config";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TextEditor from "../TextEditor";
import requestservice from "../../appwrite/requestService";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, reset, control } = useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    if (post) {
      reset({
        title: post?.title || "",
        slug: slugTransform(post?.title) || "",
        content: post?.content || "",
        status: post?.status || "active",
      });
    }
  }, [post, reset, slugTransform]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    const checkRequestStatus = async () => {
      if (!userData) {
        setLoading(false);
        return;
      }
      try {
        const request = await requestservice.getRequestByEmailAndStatus(
          userData?.userData.email
        );
        setIsAccepted(!!request);
      } catch (error) {
        console.error("error in checking status");
      } finally {
        setLoading(false);
      }
    };
    checkRequestStatus();
  }, [userData]);

  const submit = async (data) => {
    try {
      data.slug = slugTransform(data.title);
      let file = null;
      let dbPost = null;

      if (post) {
        // Update Post First (Without Image Upload)
        dbPost = await service.updatePost(post.$id, data);

        if (dbPost && data?.image?.[0]) {
          // Upload new image after successful update
          file = await service.uploadFile(data.image[0]);

          // Delete old image only if the new one is uploaded
          if (file) {
            await service.deleteFile(post.featuredImage);
            await service.updatePost(post.$id, { featuredImage: file.$id });
          }
        }
      } else {
        // Create Post First (Without Image Upload)
        dbPost = await service.createPost({
          ...data,
          userId: userData?.userData.$id,
        });

        if (dbPost && data?.image?.[0]) {
          // Upload image after post creation success
          file = await service.uploadFile(data.image[0]);

          // If image upload succeeds, update the post with the image ID
          if (file) {
            await service.updatePost(dbPost.$id, { featuredImage: file.$id });
          }
        }
      }

      if (dbPost) {
        alert(" Blog post submitted successfully.");
        navigate(`/post/${dbPost.$id}`);
      } else {
        console.error("Post submission failed.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      display="flex"
      flexwrap="wrap"
    >
      <Box width="66%" px={2}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...register("title", { required: true })}
        />
        <TextField
          label="Slug"
          fullWidth
          margin="normal"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            })
          }
        />
        <TextEditor
          label="Content"
          name="content"
          control={control}
          defaultValue={post?.content || ""}
        />
      </Box>
      <Box width="33%" px={2}>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: !post })}
          style={{ width: "100%", marginBottom: "16px" }}
        />
        {post && (
          <Box width="100%" mb={2}>
            <img
              src={service.getfilePreview(post.featuredImage)}
              alt={post.title}
              style={{ borderRadius: "8px", width: "100%" }}
            />
          </Box>
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            {...register("status", { required: true })}
            defaultValue={post?.status || "active"}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        {!isAccepted && !loading && (
          <Typography color="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
            You need an approved request to submit a post.
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color={post ? "success" : "primary"}
          fullWidth
          disabled={!isAccepted || loading}
        >
          {loading ? (
            <CircularProgress size="30px" />
          ) : post ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default PostForm;
