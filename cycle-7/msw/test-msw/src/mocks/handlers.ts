import { rest } from "msw";

const todos = ["먹기", "자기", "놀기"];

export const handlers = [
    // 할일 목록
    rest.get("/todos", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(todos));
    }),

    // 할일 추가
    rest.post("/todos", async (req, res, ctx) => {
        todos.push(await req.text());
        return res(ctx.status(201));
    }),

    // 할일 삭제
    rest.delete("/todos/:idx", async (req, res, ctx) => {
        const {idx} = req.params;

        todos.splice(Number(idx), 1);

        return res(ctx.status(200));
    })
];