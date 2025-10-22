import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Blog from "./Blog"
import userEvent from '@testing-library/user-event'

test("<Blog /> renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const user = {
    id: "68f5e60c343e48aaa40a64ed",
    name: "admin",
    username: "root",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY4ZjVlNjBjMzQzZTQ4YWFhNDBhNjRlZCIsImlhdCI6MTY5NzAwMDAwMH0.c1NX0.hVMShZkm56CW-zOnL7ljLoDuetZaPEp-QzoPfETDqu4",
  }

  const blog = {
    title: "the king",
    author: "hameno",
    url: "https://hameno.com",
    likes: 0,
    user: {
      id: "68f5e60c343e48aaa40a64ed",
      name: "admin",
      username: "root",
    },
  }

  render(<Blog blog={blog} user={user} />)
  const element = screen.getByText(/the king hameno/i)
  expect(element).toBeInTheDocument()

  //url and title not in document by default
  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(/likes/i)

  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

