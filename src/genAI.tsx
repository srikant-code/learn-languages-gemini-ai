import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { CustomButton } from "./IconWrapper";
import CustomInput from "./Input";
import CustomSelect, { CustomSelectOption } from "./Select";
import { STRINGS } from "./utilities/constants";

// Access your API key as an environment variable (see "Set up your API key" above)
export const GenAI = (apiKey) =>
  new GoogleGenerativeAI(
    apiKey || import.meta.env.VITE_REACT_APP_GEMINI_API_KEY
  );

// Define your models here (you can find them in the "Supported models" section of the API documentation)
const MODELS = STRINGS.MODELS;
// ...

// The Gemini 1.5 models are versatile and work with most use cases
const GetModel = (model) =>
  GenAI().getGenerativeModel({ model: model || MODELS.FLASH_1_5 });

// ...

const GenAIConfigurator = () => {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState(Object.keys(MODELS)[0]);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    GetModel(model);
  };

  const initializeGenAI = () => {
    // Assuming GenAI is a function to initialize the AI with the API key and model
    // This function would actually call GenAI(apiKey).getGenerativeModel({ model: selectedModel });
    console.log(
      `Initializing with API Key: ${apiKey} and Model: ${selectedModel?.label}`
    );
  };

  return (
    <div>
      <CustomInput
        type="text"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="Enter your API Key"
      />
      <CustomSelect
        value={selectedModel}
        onChange={handleModelChange}
        placeholder="Select Gemini model">
        {Object.entries(MODELS).map(([modelKey, modelValue]) => (
          <CustomSelectOption key={modelKey} value={modelValue}>
            {modelValue?.label}
          </CustomSelectOption>
        ))}
      </CustomSelect>
      <CustomButton onClick={initializeGenAI}>Initialize GenAI</CustomButton>
    </div>
  );
};

export default GenAIConfigurator;
