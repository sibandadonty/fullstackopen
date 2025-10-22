import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import blogServices from "../services/blogs";

const user = {
  id: "68f5e60c343e48aaa40a64ed",
  name: "admin",
  username: "root",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY4ZjVlNjBjMzQzZTQ4YWFhNDBhNjRlZCIsImlhdCI6MTY5NzAwMDAwMH0.c1NX0.hVMShZkm56CW-zOnL7ljLoDuetZaPEp-QzoPfETDqu4",
};

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
};

describe("<Blog />", () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    render(<Blog blog={blog} user={user} />);
  });

  test("<Blog /> renders the blog's title and author, but does not render its URL or number of likes by default", () => {

    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(/likes/i);

    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });

  test("blog's URL and number of likes are shown when the button has been clicked.", async () => {
    const user = userEvent.setup();
    // const expandBlog = vi.fn();
    const button = screen.getByText(/view/i);

    await user.click(button);
    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(/likes/i);
    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();

  });

  test("if the like button is clicked twice", async () => {
    vi.spyOn(blogServices, "updateLikes").mockImplementation(() => Promise.resolve());

    const userSim = userEvent.setup();

    await userSim.click(screen.getByText(/view/i));

    const likeButton = screen.getByRole("button", { name: /like/i });
    await userSim.click(likeButton);
    await userSim.click(likeButton);

    expect(blogServices.updateLikes).toHaveBeenCalledTimes(2);
  });
});
