import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(query ? `/search?query=${query}` : "/search");
  };
  return (
    <Form className="mb-3" onSubmit={submitHandler}>
      <InputGroup className="flex-grow-1 d-flex me-auto gap-2">
        <FormControl
          type="text"
          name="q"
          id="qn"
          placeholder="Search Book Name"
          aria-label="Search Book Name"
          aria-describedby="button-search"
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <FormControl
          type="text"
          name="q"
          id="qa"
          placeholder="Search Book Author"
          aria-label="Search Book Author"
          aria-describedby="button-search"
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
