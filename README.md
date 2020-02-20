# Form com o unfrom

> Crie um **componente** personalizado utilizando o [unform](https://github.com/Rocketseat/unform).

## Libs

- [Unform](https://github.com/Rocketseat/unform)
- [Yup](https://github.com/jquense/yup)

Exemplo de um `Input` básico com o [unform](https://github.com/Rocketseat/unform).

> essa é a estrutura da pasta `src`.

```
src.
    ├── components
    │   └── Form
    │       ├── index.js
    │       └── Input.js
    ├── App.css
    ├── App.js
    ├── index.css
    └── index.js
```

```jsx
// Input.js
import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} {...rest} />;
}
```

```jsx
// App.js
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
```

# Complex Form

> Utilizando o [unform](https://github.com/Rocketseat/unform) conseguimos exportar estruturas de objetos mais complexas, não só chave e valor, mas sim, também coleções de objetos mais complexas.

Utilizamos dessa forma no [unform](https://github.com/Rocketseat/unform) para separar as chaves de um objeto para uma coleção de dados mias complexa.

```jsx
// App.js
import React from "react";
import { Form } from "@unform/web";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    name: "Carlos Daniel",
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
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
```

```jsx
// Input.js
import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
}
```

Essa é uma forma muito interessante de estruturar um objeto, porém o [unform](https://github.com/Rocketseat/unform) tem uma ferramenta muito legal que ajuda a gente a organizar as coisas de uma maneira espetacular, o `<Scope>`.

```jsx
// App.js
import React from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    name: "Carlos Daniel",
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
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
```

Dessa forma podemos extrair objetos com estruturas mais complexas de um formulário em mudar muita coisa e de uma maneira beem mais sênior haha

## Errors 1

Aqui esta a maneira mais imples de fazer a validação de erros nos compos de um fomulário.

```jsx
// App.js
import React from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    name: "Carlos Daniel",
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
};

function App() {
  function handleSubmit(data) {
    if (data.user.name === "") {
      alert("nome vazio");
    }
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
```

> Adicionamos uma condicional pra ver se o campo está vazio, mas cá entre nós, isso em um formulário complexo, é chato e verboso.

## Referenciando o nosso form

Utilizando o [unform 2](https://github.com/Rocketseat/unform) temos uma feature bem legal pra gente manipular o formulário, utilizando o `hook` `useRef` da API de `hooks` do [react](https://reactjs.org/docs/getting-started.html) acesso direto ao elemento do fomulário de uma manira muito mais performática, você pode ver alguma dessas funções pra manipulação direto dos elementos de uma formulário fazendo dessa maneira.

```jsx
// App.js
import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    name: "Carlos Daniel",
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
};

function App() {
  const formRef = useRef(null);
  function handleSubmit(data) {
    if (data.user.name === "") {
      alert("nome vazio");
    }
    console.log(formRef.current); // aqui vemos as funções do formulário usando useRef
  }
  return (
    <div className="App">
      <h1>Form</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        {/* não se esqueça de passar o ref no form*/}
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
```

Você pode observar no `console.log()` após o `IF` na função que trata o `submit` do formulário as funções para manipualão de dados e erros no formulário.

## Errors 2 (Setando erros em um campo especifico)

Legal, agora, lembra daquele `alert()` que colocamos na validação de erros convencional ?, e se a gete dissesse pro usuário exatamente onde está o erro ? se você oljhar o `console.log(formRef.current)`, lá tem várias funções legais, uma delas se chama `setFieldErrors()` que vamos usar pra setar o erro em um campo especifico, essa função recebe 2 parâmetros, o `field` e a `errorMessage`, então vamos lá ?

```jsx
// App.js
import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    name: "Carlos Daniel",
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
};

function App() {
  const formRef = useRef(null);
  function handleSubmit(data) {
    if (data.user.name === "") {
      formRef.current.setFieldError("user.name", "O nome é obrigatório");
    }
    console.log(formRef.current); // aqui vemos as funções do formulário usando useRef
  }
  return (
    <div className="App">
      <h1>Form</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        {/* não se esqueça de passar o ref no form*/}
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
```

Após modificar nosso `App.js` vamos modificar nosso `Input.js`, aqui mora o segredo da coisa, go go:

```jsx
// Input.js
import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: "#f00" }}>{error}</span>}
    </>
  );
}
```

Note que desestruturamos os parâmetros do `hook useField`, e até agora não tinhamos usado o `error`, ele serve justamente pra isso, fizemos uma condicional, se ele é verdadeiro, exibimos um `<span>` em tela com o conteúdo da variável, simples não ?

Agora vamos explorar um pouco mais as [funções](https://unform.dev/recipes/accessing-form-ref) pra manipular os dados do formulário, imagine que por uma determinada condição a gente tem que mostrar vários erros nos campos do formulário, ainda vamos utilizar a mesma condição da função `handleSubmit`, mas depois a gente melhora isso, é mais didático.

```jsx
// App.js
import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    // name: "Carlos Daniel", note que eu comentei o name pra condição ser suprida.
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
};

function App() {
  const formRef = useRef(null);
  function handleSubmit(data) {
    if (data.user.name === "") {
      // formRef.current.setFieldError("user.name", "O nome é obrigatório"); // a gente troca isso por isso:
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
    console.log(formRef.current); // aqui vemos as funções do formulário usando useRef
  }
  return (
    <div className="App">
      <h1>Form</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        {/* não se esqueça de passar o ref no form*/}
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
```

Aqui utilizamos a função `setErrors`, ela nos permite exibir várias error-messages, onde e quando quisermos, útil né ?

Beleza, e se eu quiser que limpar o formulário ? temos uma função pra isso haha, segue o código que é bem auto-explicativo:

```jsx
// App.js
import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {
  user: {
    // name: "Carlos Daniel", note que eu comentei o name pra condição ser suprida.
    email: "daniel@suldopara.com.br",
    pass: "123abcd"
  }
};

function App() {
  const formRef = useRef(null);
  function handleSubmit(data, { reset }) {
    // desestrutura a function reset e invoca ela e tá tudo certo :)
    if (data.user.name === "") {
      // formRef.current.setFieldError("user.name", "O nome é obrigatório"); // a gente troca isso por isso:
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
    // console.log(formRef.current); // aqui vemos as funções do formulário usando useRef
    reset(); // invoquei a função :)
  }
  return (
    <div className="App">
      <h1>Form</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        {/* não se esqueça de passar o ref no form*/}
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
```

Show, agora vamos validar os dados de uma menira mais sêniorrr hahaha, vamos usar a lib [Yup](https://github.com/jquense/yup), aqui é uma breve prévia da integração do [Unform 2](https://github.com/Rocketseat/unform) com o [Yup](https://github.com/jquense/yup), mais detalhes sobre isso você encontra [aqui](https://unform.dev/guides/validation).

Vamos mudar um pouquinho nosso `App.js`

```jsx
// App.js
import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import * as Yup from "yup"; // importa ele aqui

import Input from "./components/Form/Input.js";
import "./App.css";

const initialData = {};

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      // 0

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
      // 1
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        // 2
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        // 3
        formRef.current.setErrors(errorMessages);
      }
    }
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
```

Bem, vamos lá...

- 0
  > Aqui criamos um modelo (schema) do objeto que queremos para ser valdiado.
- 1
  > Verificamos se o erro é uma Instância da validação de erros do `Yup`.
- 2
  > Percorremos as mensagens de erros e setamos na variável `errorMessages`.
- 3
  > Por fim setamos os erros na função responsável.

## Async Complete

Suponha que você queira fazer uma chamada a API quando o usuário executar determinada ação e preencher os campos do seu formulário, o mais legal no [Unform 2](https://github.com/Rocketseat/unform) é que isso é molezinha, se liga só como fica nosso código:

```jsx
// App.js
import React, { useRef, useEffect } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import * as Yup from "yup"; // importa ele aqui

import Input from "./components/Form/Input.js";
import "./App.css";

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      // 0

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
      // 1
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        // 2
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        // 3
        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        // aqui eis o segredo haha
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
```

Observando as [funções](https://unform.dev/recipes/accessing-form-ref) pra manipulação do formulário por referência, nos deparamos com a função `setData` (que é bem sugestiva por sinal) que faz isso que a gente quer, setar os dados de um objeto no formulário após uma chamada á API (isso na minha opinião é uma das coisas mais incriveis), bem fico por aqui, qualquer coisa da uma olhada na [doc](https://unform.dev/) do [unform](https://unform.dev/).
