import React from "react";
import { Form } from "@unform/web";
import Input from "./components/Form/Input.js";
import "./App.css";

function App() {
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <div className="App">
      <h1>Form</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="pass" />

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;
