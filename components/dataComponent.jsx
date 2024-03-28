import styled from 'styled-components';

export const DataCopmonent = ({ data, title, years }) => {
  const ColumnComponent = years ? ColumnWithYear : Column;

  return (
    <ColumnComponent>
      <Header>{title}</Header>
      {years
        ? data
            .slice()
            .reverse()
            .map((elm, index) => {
              return (
                <Container key={index}>
                  <Year>{elm.properties.year.title[0].plain_text}</Year>
                  <Text>{elm.properties.Text.rich_text[0].plain_text}</Text>
                </Container>
              );
            })
        : data.map((elm, index) => {
            return <Container1 key={index}>{elm.plain_text}</Container1>;
          })}
    </ColumnComponent>
  );
};

const Header = styled.h1`
  margin-bottom: 2vw !important;
`;

const Column = styled.div`
  flex: 0 0 auto;
  width: 40vw;
  margin: 2vw;
`;
const Container1 = styled.div``;

const Container = styled.div`
  display: flex;
  width: 40vw;
  gap: 1.5vw;
`;

const Text = styled.p`
  width: auto;
`;

const Year = styled.p`
  min-width: 75px;
  max-width: 75px;
`;

const ColumnWithYear = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 80vh;
  width: auto;
  margin: 2vw;
  flex: 0 0 auto;
`;
