import React from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  name: "Carlos Daniel",
  email: "daniel@suldopara.com.br",
  pass: "123abcd"
};

function App() {
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <div className="App">
      <h1>Form</h1>
      <Form initialData={initialData} onSubmit={handleSubmit}>
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
