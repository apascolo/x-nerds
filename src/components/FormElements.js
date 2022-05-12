import React, { useContext, useEffect } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { PokemonContext } from "../contexts/PokemonContext";

export function Form(props) {
  // console.log(props);
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" noValidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

export function TextField({
  name,
  label,
  placeholder,
  minLength,
  maxLength,
  required,
  description,
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      {description && <span className="text-xs">{description}</span>}
      <Field
        className="block w-full rounded py-3 px-4 leading-tight focus:outline-none"
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}
export function ArrayField({
  name,
  label,
  placeholder,
  minLength,
  maxLength,
  required,
  description,
}) {
  const { formData, setFormData } = useContext(PokemonContext);

  let currentValue = document.getElementById("currentValue");

  let { tags } = formData;

  useEffect(() => {
    document.getElementById("currentValue").value = "";
  }, [tags, formData, currentValue]);

  const handleAddTag = (e) => {
    e.preventDefault();
    // console.log(document.getElementById("currentValue").value);
    const newValue = currentValue.value;
    if (newValue.trim() === "") {
      alert("Please enter a tag");
      return;
    }

    if (tags.find((tag) => tag === newValue)) {
      alert("Tag already exists");
      return;
    }

    tags.push(newValue);
    setFormData({ ...formData, tags });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full col-span-2">
          {label && (
            <label
              htmlFor="currentValue"
              className="block tracking-wide text-white"
            >
              {label}
            </label>
          )}
          <span className="text-xs">{description}</span>
          <Field
            className="block w-full rounded py-3 px-4 leading-tight focus:outline-none mb-0"
            type="text"
            name="currentValue"
            id="currentValue"
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
          />
        </div>
        <button
          type="button"
          onClick={handleAddTag}
          className="rounded bg-indigo-600 hover:bg-indigo-900 p-3 h-min mt-auto"
        >
          Agregar
        </button>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
      {(tags && tags.length) > 0 && (
        <div className="flex flex-row flex-wrap gap-2 my-3" id="showTags">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={tag}
                className="rounded p-2 flex items-center bg-slate-500"
              >
                {tag}{" "}
              </span>
            ))}
        </div>
      )}
    </>
  );
}
export function NumberField({
  name,
  label,
  placeholder,
  required,
  description,
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      {description && <span className="text-xs">{description}</span>}
      <Field
        className="block w-full rounded py-3 px-4 leading-tight focus:outline-none"
        type="number"
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SelectField({
  name,
  label,
  options,
  required,
  keySelect,
  description,
}) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      {description && <span className="text-xs">{description}</span>}
      <Field
        as="select"
        id={name}
        name={name}
        required={required}
        className="block w-full rounded py-3 px-4 leading-tight focus:outline-none"
      >
        <option value="">Selecciona una opción...</option>

        {keySelect !== "oneOf"
          ? options.map((optn, index) => (
              <option key={optn} value={optn} label={optn} />
            ))
          : options.map((optn, index) => (
              <option key={optn.const} value={optn.const} label={optn.title} />
            ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}
export function SelectBoolField({ name, label, required, description }) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      {description && <span className="text-xs">{description}</span>}
      <Field
        as="select"
        id={name}
        name={name}
        required={required}
        className="block w-full rounded py-3 px-4 leading-tight focus:outline-none"
      >
        <option value="">Selecciona una opción...</option>

        <option key="si" value={true} label="Sí" />
        <option key="no" value={false} label="No" />
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function RadioField({ name, label, required, description }) {
  const { formData, setFormData } = useContext(PokemonContext);

  const handleChange = (e) => {
    const value = e.target.value;
    const _formData = { ...formData };
    if (value !== _formData[name]) {
      if (value === "true") {
        _formData[name] = true;
      }
      if (value === "false") {
        _formData[name] = false;
      }
      setFormData(_formData);
    }
  };

  return (
    <div className="grid grid-cols-1 mb-3">
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      {description && <span className="text-xs">{description}</span>}
      <div className="w-full flex mt-3">
        <div className="flex flex-row items-center mr-5">
          <Field
            type="radio"
            name={name}
            id="si"
            value={true}
            required={required}
            onChange={handleChange}
          ></Field>
          <label htmlFor="si" className="ml-2 cursor-pointer">
            Sí
          </label>
        </div>
        <div className="flex flex-row items-center mr-5">
          <Field
            type="radio"
            name={name}
            id="no"
            value={false}
            required={required}
            onChange={handleChange}
          ></Field>
          <label htmlFor="no" className="ml-2 cursor-pointer">
            No
          </label>
        </div>
      </div>
    </div>
  );
}

export function DateTimeField({ name, label, required, maxDate, description }) {
  return (
    <>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      {description && <span className="text-xs">{description}</span>}
      <Field
        className="block w-full rounded py-3 px-4 leading-tight focus:outline-none"
        type="date"
        name={name}
        id={name}
        required={required}
        max={maxDate}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SubmitButton({ title }) {
  return (
    <button
      type="submit"
      className="rounded mt-3 w-full p-3 bg-green-600 hover:bg-green-900"
    >
      {title}
    </button>
  );
}
