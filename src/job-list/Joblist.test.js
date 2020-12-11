import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import JobData from "./data.json";
import JobList from './JobList';

jest.useFakeTimers();

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("renders if job list length equals to mock data length", () => {
	const mockDataLength = JobData.length;
	act(() => {
		render(<JobList />, container);
	});
	expect(container.querySelectorAll(".two.cards").length).toBe(mockDataLength);
});

