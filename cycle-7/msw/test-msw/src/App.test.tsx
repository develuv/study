import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

test("renders todos", async () => {
    render(<App/>);

    const listitems = await screen.findAllByRole("listitem");
    expect(listitems).toHaveLength(3);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
        userEvent.type(screen.getByRole("textbox"), "공부하기");
        userEvent.click(screen.getByRole("button"));
    })


    expect(await screen.findByText("공부하기")).toBeInTheDocument();
});
