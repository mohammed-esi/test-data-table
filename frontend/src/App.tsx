import {
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { headerTable } from './constant/header';
import { Pokemon } from './types/pokemon';
import { fetchData } from './utils/fetchData';

const App: FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      event?.preventDefault();
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const fetchDataCallback = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchData();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pokemon, searchQuery]);

  return (
    <>
      <Box sx={{ py: 5, px: 5 }}>
        <Box sx={{ py: 4, my: 4, px: 3 }} component={Paper}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            label={'Search'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />{' '}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, borderRadius: 5 }}>
            <TableHead sx={{ backgroundColor: '#F5F7F8' }}>
              <TableRow>
                {headerTable.map((ht, index) => (
                  <TableCell key={index} align='center'>
                    {ht}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align='center' colSpan={9}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {searchQuery !== '' ? (
                    <>
                      {filteredPokemon.map((pk, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}>
                          <TableCell align='center'>{pk.id}</TableCell>
                          <TableCell align='center'>{pk.name}</TableCell>
                          <TableCell align='center'>
                            {pk.type.join(', ')}
                          </TableCell>
                          <TableCell align='center'>{pk.hp}</TableCell>
                          <TableCell align='center'>{pk.attack}</TableCell>
                          <TableCell align='center'>{pk.defense}</TableCell>
                          <TableCell align='center'>
                            {pk.special_attack}
                          </TableCell>
                          <TableCell align='center'>
                            {pk.special_defense}
                          </TableCell>
                          <TableCell align='center'>{pk.speed}</TableCell>
                          <TableCell align='center'>
                            {pk.hp +
                              pk.attack +
                              pk.defense +
                              pk.special_attack +
                              pk.special_defense +
                              pk.speed}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      {(rowsPerPage > 0
                        ? pokemon.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : pokemon
                      ).map((pk, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}>
                          <>
                            <TableCell align='center'>{pk.id}</TableCell>
                            <TableCell align='center'>{pk.name}</TableCell>
                            <TableCell align='center'>
                              {pk.type.join(', ')}
                            </TableCell>
                            <TableCell align='center'>{pk.hp}</TableCell>
                            <TableCell align='center'>{pk.attack}</TableCell>
                            <TableCell align='center'>{pk.defense}</TableCell>
                            <TableCell align='center'>
                              {pk.special_attack}
                            </TableCell>
                            <TableCell align='center'>
                              {pk.special_defense}
                            </TableCell>
                            <TableCell align='center'>{pk.speed}</TableCell>
                            <TableCell align='center'>
                              {pk.hp +
                                pk.attack +
                                pk.defense +
                                pk.special_attack +
                                pk.special_defense +
                                pk.speed}
                            </TableCell>
                          </>
                        </TableRow>
                      ))}
                    </>
                  )}
                </>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={pokemon.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default App;
