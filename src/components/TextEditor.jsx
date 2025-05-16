import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import configEnv from "../configEnv/configEnv";

const TextEditor = ({ name, control, label, defaultValue = "" }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
          {label}
        </Typography>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={configEnv.tinyApiKey}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </Box>
  );
};

export default TextEditor;
