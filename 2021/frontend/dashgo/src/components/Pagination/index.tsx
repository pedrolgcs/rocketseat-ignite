import { Stack, Text, Box } from '@chakra-ui/react';

// components
import { Item } from './Item';

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

type PaginationProps = {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : [];

  return (
    <Stack
      direction={['column', 'row']}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + SIBLINGS_COUNT && (
          <>
            <Item onPageChange={onPageChange} pageNumber={1} />
            {currentPage > 2 + SIBLINGS_COUNT && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <Item onPageChange={onPageChange} key={page} pageNumber={page} />
          ))}

        <Item onPageChange={onPageChange} pageNumber={currentPage} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <Item onPageChange={onPageChange} key={page} pageNumber={page} />
          ))}

        {currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <Item onPageChange={onPageChange} pageNumber={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

export { Pagination };
