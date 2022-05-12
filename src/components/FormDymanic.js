import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { PokemonContext } from "../contexts/PokemonContext";
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  NumberField,
  DateTimeField,
  RadioField,
  ArrayField,
  SelectBoolField,
} from "./FormElements";

export const FormDymanic = ({ properties, title }) => {
  const { formData, setFormData } = useContext(PokemonContext);
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(properties);
  }, [properties]);

  const initForm = (properties) => {
    const _formData = {};
    let _validationSchema = {};
    for (const key of Object.keys(properties)) {
      if (properties[key].type === "string") {
        _formData[key] = "";
        if (properties[key].maxLength && properties[key].minLength) {
          _validationSchema[key] = Yup.string()
            .max(properties[key].maxLength)
            .min(properties[key].minLength)
            .required();
        } else if (properties[key].maxLength) {
          _validationSchema[key] = Yup.string()
            .max(properties[key].maxLength)
            .required();
        } else if (properties[key].minLength) {
          _validationSchema[key] = Yup.string()
            .min(properties[key].minLength)
            .required();
        } else {
          _validationSchema[key] = Yup.string().required();
        }
      }
      if (properties[key].type === "boolean") {
        _formData[key] = "";
        _validationSchema[key] = Yup.boolean().required();
      }
      if (properties[key].type === "number") {
        _formData[key] = 0;
        _validationSchema[key] = Yup.number().required();
      }
      if (properties[key].type === "array") {
        _formData[key] = [];
        _validationSchema[key] = Yup.array().min(1).required();
      }

      setFormData(_formData);
      setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }
  };

  const getFormElement = (key, properties) => {
    const props = {
      name: key,
      label: properties.label || properties.title || key,
      placeholder: properties.placeholder || properties.title || key,
      minLength: properties.minLength || null,
      maxLength: properties.maxLength || null,
      required: properties.required || false,
      maxDate: properties.maxDate || new Date().toISOString().split("T")[0],
      description: properties.description || null,
    };

    if (properties.type === "string") {
      if (!properties.format) {
        for (const prop of Object.keys(properties)) {
          if (Array.isArray(properties[prop])) {
            return (
              <SelectField
                {...props}
                options={properties[prop]}
                keySelect={prop}
              />
            );
          }
        }
        return <TextField {...props} />;
      } else if (properties.format === "date-time") {
        return <DateTimeField {...props} />;
      }
    }
    if (properties.type === "number") {
      return <NumberField {...props} />;
    }
    if (properties.type === "boolean") {
      return <SelectBoolField {...props} />;
    }
    // if (properties.type === "boolean") {
    //   return <RadioField {...props} />;
    // }
    if (properties.type === "array") {
      return <ArrayField {...props} />;
    }
  };

  const handleSubmit = (values) => {
    delete values.currentValue;

    for (const val of Object.keys(values)) {
      if (values[val] === "true") {
        values[val] = true;
      }
      if (values[val] === "false") {
        values[val] = false;
      }
    }

    console.log(values);
    setFormData(values);
  };

  return (
    <div className="p-4 rounded-2xl gridForm">
      <h3 className="text-xl mb-3">{title}</h3>
      <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {Object.keys(properties).map((key, ind) => (
          <div key={key}>{getFormElement(key, properties[key])}</div>
        ))}
        <SubmitButton title="Send" />
      </Form>
    </div>
  );
};
