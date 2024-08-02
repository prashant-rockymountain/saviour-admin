import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, CardContent, TableHead } from "@mui/material";
import { FC, useState } from "react";
import { tableTypes } from "src/configs/g_types/types";

const GTable: FC<tableTypes> = ({
  row,
  isLoading,
  data,
  headData,
  ...props
}) => {
  const Component = row;
  const { ...rest } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  function handleChangePage(event: any, newpage: any) {
    setPage(parseFloat(newpage));
  }

  function handleChangeRowsPerPage(event: any) {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  }

  return (
    <>
      {!isLoading && data?.length == 0 ? (
        <Box
          width={"100%"}
          height={"70vh"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            sx={{ width: { xs: "100%", sm: "500px" } }}
            src="/images/nodata.png"
          />
        </Box>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    {headData?.map((headCell) => (
                      <TableCell
                        align={headCell.align as any}
                        key={Math.random()}
                        sx={{ bgcolor: "transparent" }}
                      >
                        {headCell?.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(isLoading
                    ? Array.from(new Array(8))
                    : data?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  )?.map((item: any, index: number) => {
                    return (
                      <Component
                        key={Math.random()}
                        row={item}
                        index={index}
                        serialNumber={
                          page == 0 ? index + 1 : page * rowsPerPage + index + 1
                        }
                        isLoading={isLoading}
                        {...rest}
                      />
                    );
                  })}
                </TableBody>
                {data?.length > 7 && (
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[8, 30, 45]}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default GTable;
