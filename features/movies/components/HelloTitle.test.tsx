import { render, screen, fireEvent } from "@testing-library/react-native";
import HelloTitle from "./HelloTitle";

const mockUseWindowDimensions = jest.fn();

jest.mock("react-native/Libraries/Utilities/useWindowDimensions", () => ({
  default: mockUseWindowDimensions,
}));

describe("<HelloTitle />", () => {
  beforeEach(() => {
    mockUseWindowDimensions.mockReturnValue({ width: 750 });
  });
  it("should display Hello, {name}! if the name is passed in", () => {
    const testName = "Test";
    render(<HelloTitle name={testName} />);

    expect(screen.getByText(`Hello, ${testName}!`)).toBeTruthy();
  });

  it("should display Hello! if the name is not passed in", () => {
    render(<HelloTitle />);

    expect(screen.getByText("Hello!")).toBeTruthy();
  });

  it("should display 32px font size for 'Hello!' without a name", () => {
    render(<HelloTitle />);

    const textElement = screen.queryByText("Hello!");
    expect(textElement?.props["style"]).toHaveProperty("fontSize", 32);
  });

  it("should display 24px font size for 'Hello, {name}' with a name", () => {
    render(<HelloTitle name="Junior" />);

    const textElement = screen.queryByText("Hello, Junior!");
    expect(textElement?.props["style"]).toHaveProperty("fontSize", 24);
  });

  it("should cut off the name if it is longer than the screen width", () => {
    const TEST_SCREEN_WIDTH = 400;
    const TEST_TITLE_WIDTH = 500;
    mockUseWindowDimensions.mockReturnValue({ width: TEST_SCREEN_WIDTH });
    render(<HelloTitle name="Junior Pitchayut Chitsinpchayakun" />);

    const titleNameElement = screen.getByText(
      "Hello, Junior Pitchayut Chitsinpchayakun!"
    );

    fireEvent(titleNameElement, "layout", {
      nativeEvent: {
        layout: {
          width: TEST_TITLE_WIDTH,
        },
      },
    });

    expect(screen.getByText("Hello!")).toBeTruthy();
  });
});
