import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) => {
    if (props.type === "horizontal") {
      return css`
        align-items: center;
        justify-content: space-between;
      `;
    }
    if (props.type === "vertical") {
      return css`
        flex-direction: column;
        gap: 1.6rem;
      `;
    }
  }}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
