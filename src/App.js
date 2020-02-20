import React, { useRef, useEffect } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import * as Yup from "yup";
import Input from "./components/Form/Input.js";
import "./App.css";

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        user: Yup.object().shape({
          name: Yup.string().required("é obrigátorio"),
          email: Yup.string()
            .email("digite um email válido")
            .required("é obrigatório")
        }),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, "minimo de 3 caracteres")
            .required("é obrigatório")
        })
      });

      await schema.validate(data, { abortEarly: false });
      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
    // console.log(data); // funções do formulário usando useRef
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        user: {
          name: "Carlos Daniel",
          email: "danphp7@gmail.com"
        }
      });
    }, 2000);
  }, []);

  return (
    <div className="App">
      <h1>Form</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Scope path="user">
          <Input name="name" /> <br />
          <Input type="email" name="email" /> <br />
          <Input type="password" name="pass" /> <br />
        </Scope>
        <Scope path="address">
          <Input name="street" /> <br />
          <Input name="number" /> <br />
          <Input name="city" /> <br />
        </Scope>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;
