import { useState, useContext, createContext, useMemo } from "react";

interface Genres {
  action?: boolean;
  comedy?: boolean;
  drama?: boolean;
  horror?: boolean;
  romance?: boolean;
  thriller?: boolean;
  sciFI?: boolean;
}

interface FormData {
  address: string;
  userName: string;
  avatarUrl?: string;
  aviFileData?: unknown;
  genres?: Genres;
}

interface FormContextProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  updateAviFileData: (newData: unknown) => void;
}

interface FormProviderProps {
  children: React.ReactNode;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    userName: "",
    avatarUrl: "",
  });

  const updateAviFileData = (newData: unknown) => {
    // Replace `any` with the actual type of your AVI file data
    setFormData((prevData) => ({
      ...prevData,
      aviFileData: newData,
    }));
  };

  const value = useMemo(() => {
    const updateFormData = (data: Partial<FormData> | (() => FormData)) => {
      if (typeof data === "function") {
        setFormData((prevData) => ({
          ...prevData,
          ...data(),
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
      }
    };
    return { formData, updateFormData, updateAviFileData };
  }, [formData]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
