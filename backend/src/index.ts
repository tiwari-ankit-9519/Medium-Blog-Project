import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";
import {
  signinInput,
  signupInput,
  createBlogInput,
  updateBlogInput,
} from "@ankittiwari9519/medium-blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("*", cors());

app.use("/api/v1/blog/*", async (c, next) => {
  const token = c.req.header("authorization") || "";
  const user = await verify(token, "secret");

  try {
    if (user) {
      //@ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "You are not logged in!",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "You are not logged in!",
    });
  }
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Invalid Inputs",
      });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, "secret");

    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Invalid Input",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.json({
        msg: "User not found!",
      });
    }

    const jwt = await sign({ id: user.id }, "secret");
    return c.json({
      jwt,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});

app.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get("userId");
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Invalid Input",
      });
    }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});

app.put("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Invalid Input",
      });
    }
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (e) {
    return c.json({
      error: e,
    });
  }
});

app.get("/api/v1/blog/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return c.json({
    posts,
  });
});

app.get("/api/v1/blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const newId = Number(id);

  const post = await prisma.post.findUnique({
    where: {
      id: newId,
    },
    include: {
      author: true,
    },
  });

  return c.json({
    post,
  });
});

export default app;
