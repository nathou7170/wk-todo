const router = require('express').Router();
const Todo = require('../models/model');

router.get("/", async(req, res)=>{
    const allTodos = await Todo.find();
    res.render("../views/index.ejs", {data: allTodos});
    console.log(allTodos);
});

router.post("/add/todo", (req, res)=>{
    const todo = req.body;
    const newTodo = Todo(todo);
    newTodo.save()
    .then(()=>{
        console.log("Successfully added todo");
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.get("/edit/todo/:_id", async(req, res)=>{
    const oneTodo = await Todo.findOne(req.params);
    res.render("../views/update.ejs", {data: oneTodo});
    console.log(oneTodo);
});

router.post('/update/todo/:_id', (req, res)=>{
    const id = req.params;
    Todo.updateOne(id, {$set: {...req.body}}, {useFindAndModify: false})
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.get("/delete/todo/:_id", (req, res)=>{
  const id = req.params;
  Todo.deleteOne(id)
  .then(()=>{
      res.redirect("/");
  })
  .catch((err)=>{
      console.log(err);
  });
});





module.exports = router;