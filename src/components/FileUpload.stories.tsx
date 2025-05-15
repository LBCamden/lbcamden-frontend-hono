import { Meta, StoryObj } from "@storybook/html";
import { FileUpload } from "./FileUpload";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof FileUpload>;

export default {
  component: renderHtmlStory(FileUpload),
} satisfies Meta<typeof FileUpload>;

export const Default: Story = {
  args: { name: "file-upload-1", label: "Upload a file" },
};

export const AllowsMultipleFiles: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Upload a file",
    multiple: true,
  },
};

export const AllowsImageFilesOnly: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Upload a file",
    attributes: { accept: "image/*" },
  },
};

export const AllowsDirectMediaCapture: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Upload a file",
    attributes: { capture: "user" },
  },
};

export const Disabled: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Upload a file",
    disabled: true,
  },
};

export const WithHintText: Story = {
  args: {
    id: "file-upload-2",
    name: "file-upload-2",
    label: "Upload your photo",
    hint: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
  },
};

export const WithErrorMessageAndHint: Story = {
  args: {
    id: "file-upload-3",
    name: "file-upload-3",
    label: "Upload a file",
    hint: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
    errorMessage: "Error message goes here",
  },
};

export const WithLabelAsPageHeading: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: {
      children: "Upload a file",
      classes: "govuk-label--l",
      isPageHeading: true,
    },
  },
};

export const WithOptionalFormGroupClasses: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Upload a file",
    formGroup: { classes: "extra-class" },
  },
};

export const Enhanced: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Upload a file",
    javascript: true,
  },
};

export const EnhancedDisabled: Story = {
  args: {
    javascript: true,
    disabled: true,
    id: "file-upload-error",
    name: "file-upload-error",
    label: "Upload a file",
    hint: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
  },
};

export const EnhancedWithErrorMessageAndHint: Story = {
  args: {
    javascript: true,
    id: "file-upload-3",
    name: "file-upload-3",
    label: "Upload a file",
    hint: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
    errorMessage: "Error message goes here",
  },
};

export const Translated: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Llwythwch ffeil i fyny",
    multiple: true,
    javascript: true,
    chooseFilesButton: "Dewiswch ffeil",
    dropInstruction: "neu ollwng ffeil",
    noFileChosen: "Dim ffeil wedi'i dewis",
    multipleFilesChosen: {
      other: "%{count} ffeil wedi'u dewis",
      one: "%{count} ffeil wedi'i dewis",
    },
    enteredDropZone: "Wedi mynd i mewn i'r parth gollwng",
    leftDropZone: "Parth gollwng i'r chwith",
  },
};

export const WithValue: Story = {
  args: {
    id: "file-upload-4",
    name: "file-upload-4",
    value: "C:\\fakepath\\myphoto.jpg",
    label: "Upload a photo",
  },
};

export const Attributes: Story = {
  args: {
    id: "file-upload-attributes",
    name: "file-upload-attributes",
    label: "Upload a file",
    attributes: { accept: ".jpg, .jpeg, .png" },
  },
};

export const Classes: Story = {
  args: {
    id: "file-upload-classes",
    name: "file-upload-classes",
    label: "Upload a file",
    classes: "app-file-upload--custom-modifier",
  },
};

export const Id: Story = {
  args: { id: "file-upload-id", name: "test-name", label: "Upload a file" },
};

export const WithDescribedBy: Story = {
  args: {
    id: "file-upload-describedby",
    name: "file-upload-describedby",
    label: "Upload a file",
    describedBy: "test-target-element",
  },
};

export const WithHintAndDescribedBy: Story = {
  args: {
    id: "file-upload-hint-describedby",
    name: "file-upload-hint-describedby",
    label: "Upload a file",
    describedBy: "test-target-element",
    hint: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
  },
};

export const Error: Story = {
  args: {
    id: "file-upload-with-error",
    name: "file-upload-with-error",
    label: "Upload a file",
    errorMessage: "Error message",
  },
};

export const WithErrorAndDescribedBy: Story = {
  args: {
    id: "file-upload-error-describedby",
    name: "file-upload-error-describedby",
    label: "Upload a file",
    describedBy: "test-target-element",
    errorMessage: "Error message",
  },
};

export const WithErrorDescribedByAndHint: Story = {
  args: {
    id: "file-upload-error-describedby-hint",
    name: "file-upload-error-describedby-hint",
    label: "Upload a file",
    describedBy: "test-target-element",
    errorMessage: "Error message",
    hint: "hint",
  },
};

export const TranslatedNoJavascriptEnhancement: Story = {
  args: {
    id: "file-upload-1",
    name: "file-upload-1",
    label: "Llwythwch ffeil i fyny",
    multiple: true,
    chooseFilesButton: "Dewiswch ffeil",
    dropInstruction: "neu ollwng ffeil",
    noFileChosen: "Dim ffeil wedi'i dewis",
    multipleFilesChosen: {
      other: "%{count} ffeil wedi'u dewis",
      one: "%{count} ffeil wedi'i dewis",
    },
    enteredDropZone: "Wedi mynd i mewn i'r parth gollwng",
    leftDropZone: "Parth gollwng i'r chwith",
  },
};
