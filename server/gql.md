```

query hello{
	hello
}

mutation register{
  register(email:"dan@google.com",password: "123")
}


mutation login{
  login(email:"dan@google.com",password: "123"){
    id
    email
  }
}

```
