import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, TextField, TablePagination, CircularProgress
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "../sidebarScreens/userManagement.css"; 

interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Category/allCategory"
        );
        if (response.data.status === 200) {
          setCategories(response.data.data || []);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("Categories Updated:", categories);
  }, [categories]);

  const handleDelete = (id: string) => {
    console.log("Delete category with ID:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit category with ID:", id);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="category-container">
      <h2 className="category-title">Category Management</h2>

      {/* Search Bar */}
      <TextField
        label="Search Category"
        variant="outlined"
        size="small"
        fullWidth
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* Table */}
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        <img
                          src={category.image || "fallback-image-url.jpg"}
                          onError={(e) => (e.currentTarget.src = "fallback-image-url.jpg")}
                          alt={category.name}
                          className="category-img"
                        />
                      </TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(category._id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(category._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredCategories.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPageOptions={[5, 10, 15]}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </>
      )}
    </div>
  );
};

export default CategoryManagement;
