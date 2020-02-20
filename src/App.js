import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    // name: "Carlos Daniel",
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  },
  address: {
    city: "Redenção"
  }
};

function App() {
  const formRef = useRef(null);

  function handleSubmit(data) {
    if (data.user.name === "") {
      formRef.current.setErrors({
        user: {
          name: "O nome é obrigatório",
          email: "O Email é obrigatório"
        },
        address: {
          city: "A cidade é obrigatório"
        }
      });
    }
    // console.log(data); // funções do formulário usando useRef
  }

  return (
    <div className="App">
      <h1>Form</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
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
