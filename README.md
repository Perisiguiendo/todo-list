# TODO LIST

## Description

This is a todo-list demo with next.js、mobx、mobx-keystone、ant design。

## Functionality:

- Ability to add, modify, delete, and mark todo items as completed
- Allow filtering of todo items by: all, incomplete, and completed
- Ability to change completed todo items back to incomplete
- Display the number of filtered todo items
- Support one-click clearing of completed todo items
- Support expanding/collapsing detailed information for each todo item
- Persistently store todo item information so that it is not lost upon refreshing the page

## Interaction Details:

- Pressing enter in the todo item input field adds a new todo item
- Adding a new todo item is not allowed if the input field is empty
- Clicking the checkbox in front of a todo item marks it as completed/incomplete
- Hovering over a todo item shows a delete button, which can be clicked to delete the todo item
- The one-click clear completed button only appears if there are completed items present
- Clicking the dropdown arrow to the left of the todo item input field expands/collapses the detailed information for each todo item.
