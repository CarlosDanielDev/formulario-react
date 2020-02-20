import React from "react";
import { Form } from "@unform/web";
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
        <Input name="user.name" /> <br />
        <Input type="email" name="user.email" /> <br />
        <Input type="password" name="user.pass" /> <br />
        <Input name="address.street" /> <br />
        <Input name="address.number" /> <br />
        <Input name="address.city" /> <br />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;
