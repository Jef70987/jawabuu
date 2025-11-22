/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiPlus, FiTrash2, FiEdit, FiDollarSign, FiBook, FiLayers } from "react-icons/fi";

const FeeManagement = () => {
  // State for fee categories
  const [feeCategories, setFeeCategories] = useState([
    { id: 1, name: "Tuition Fee" },
    { id: 2, name: "Examination Fee" },
    { id: 3, name: "Activity Fee" }
  ]);
  const [categoryName, setCategoryName] = useState("");

  // State for academic terms
  const [terms, setTerms] = useState([
    { id: 1, name: "Term 1" },
    { id: 2, name: "Term 2" },
    { id: 3, name: "Term 3" }
  ]);
  const [termName, setTermName] = useState("");

  // State for fee structures
  const [feeStructures, setFeeStructures] = useState([]);
  const [grade, setGrade] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [amount, setAmount] = useState("");

  // State for school expenditures
  const [expenditures, setExpenditures] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  // Add a new fee category
  const addFeeCategory = (e) => {
    e.preventDefault();
    if (categoryName) {
      const newCategory = { id: Date.now(), name: categoryName };
      setFeeCategories([...feeCategories, newCategory]);
      setCategoryName("");
    }
  };

  // Add a new academic term
  const addTerm = (e) => {
    e.preventDefault();
    if (termName) {
      const newTerm = { id: Date.now(), name: termName };
      setTerms([...terms, newTerm]);
      setTermName("");
    }
  };

  // Add a new fee structure
  const addFeeStructure = (e) => {
    e.preventDefault();
    if (grade && selectedCategory && selectedTerm && amount) {
      const newStructure = { 
        id: Date.now(), 
        grade, 
        category: selectedCategory, 
        term: selectedTerm,
        amount: parseFloat(amount) 
      };
      setFeeStructures([...feeStructures, newStructure]);
      setGrade("");
      setSelectedCategory("");
      setSelectedTerm("");
      setAmount("");
    }
  };

  // Add a new expenditure
  const addExpenditure = (e) => {
    e.preventDefault();
    if (expenseName && expenseAmount && expenseCategory) {
      const newExpense = { 
        id: Date.now(), 
        name: expenseName,
        category: expenseCategory,
        amount: parseFloat(expenseAmount),
        date: new Date().toLocaleDateString()
      };
      setExpenditures([...expenditures, newExpense]);
      setExpenseName("");
      setExpenseAmount("");
      setExpenseCategory("");
    }
  };

  // Delete a fee structure
  const deleteFeeStructure = (id) => {
    setFeeStructures(feeStructures.filter(structure => structure.id !== id));
  };

  // Delete an expenditure
  const deleteExpenditure = (id) => {
    setExpenditures(expenditures.filter(expense => expense.id !== id));
  };

  // Container styles
  const containerStyle = {
    padding: '1rem',
    Width: '1200px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    justifyContent:'center',
    margin:'0 auto',
  };

  // Header styles
  const headerStyle = {
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const headingStyle = {
    color: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  };

  const subHeadingStyle = {
    color: '#7f8c8d',
    marginTop: '0'
  };

  // Grid and card styles
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
    gap: '1.5rem'
  };

  const cardStyle = {
    width:'1000px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '2px 0 2px 8px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    marginBottom: '1.5rem'
  };

  const wideCardStyle = {
    ...cardStyle,
    gridColumn: '1 / -1'
  };

  // Form styles
  const formStyle = {
    marginBottom: '1.5rem'
  };

  const formGroupStyle = {
    marginBottom: '1rem'
  };

  const formRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1rem'
  };

  const inputStyle = {
    width: '80%',
    padding: '0.75rem',
    border: '1px solid black',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: 'white'
  };

  // Button styles
  const buttonBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  };

  const primaryButtonStyle = {
    ...buttonBase,
    backgroundColor: 'green',
    color: 'white'
  };

  const iconButtonStyle = {
    ...buttonBase,
    padding: '0.5rem',
    borderRadius: '50%',
    width: '36px',
    height: '36px'
  };

  const dangerButtonStyle = {
    ...iconButtonStyle,
    backgroundColor: '#e74c3c',
    color: 'white'
  };

  // List and table styles
  const listStyle = {
    marginTop: '1rem',
    maxHeight: '200px',
    overflowY: 'auto'
  };

  const listItemStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  };

  const thStyle = {
    backgroundColor: 'skyblue',
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #eee'
  };

  // Responsive adjustments
  const responsiveStyles = {
    '@media (max-width: 768px)': {
      gridStyle: {
        gridTemplateColumns: '1fr'
      },
      formRowStyle: {
        flexDirection: 'column',
        gap: '0.5rem'
      }
    }
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headingStyle}><FiDollarSign /> Accountant Fee Management</h1>
        <p style={subHeadingStyle}>Create and manage fee structures and school expenditures</p>
      </header>

      <div style={gridStyle}>
        {/* Fee Categories Section */}
        <section style={cardStyle}>
          <h2 style={{...headingStyle, fontSize: '1.25rem', justifyContent: 'flex-start'}}>
            <FiBook /> Fee Categories
          </h2>
          <form onSubmit={addFeeCategory} style={formStyle}>
            <div style={formGroupStyle}>
              <label>Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Add category... e.g., Library Fee"
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={primaryButtonStyle}>
              <FiPlus /> Add Category
            </button>
          </form>
          <div style={listStyle}>
            {feeCategories.map((category) => (
              <div key={category.id} style={listItemStyle}>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Terms Section */}
        <section style={cardStyle}>
          <h2 style={{...headingStyle, fontSize: '1.25rem', justifyContent: 'flex-start'}}>
            <FiLayers /> Academic Terms
          </h2>
          <form onSubmit={addTerm} style={formStyle}>
            <div style={formGroupStyle}>
              <label>Term Name</label>
              <input
                type="text"
                value={termName}
                onChange={(e) => setTermName(e.target.value)}
                placeholder="Add term...e.g.,  Term 1"
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={primaryButtonStyle}>
              <FiPlus /> Add Term
            </button>
          </form>
          <div style={listStyle}>
            {terms.map((term) => (
              <div key={term.id} style={listItemStyle}>
                <span>{term.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Structures Section */}
        <section style={wideCardStyle}>
          <h2 style={{...headingStyle, fontSize: '1.25rem', justifyContent: 'flex-start'}}>
            <FiBook /> Fee Structures
          </h2>
          <form onSubmit={addFeeStructure} style={formStyle}>
            <div style={formRowStyle}>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Grade/Class</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g., Grade 1"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                  style={selectStyle}
                >
                  <option value="">Select Category</option>
                  {feeCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={formRowStyle}>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Term</label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  required
                  style={selectStyle}
                >
                  <option value="">Select Term</option>
                  {terms.map((term) => (
                    <option key={term.id} value={term.name}>
                      {term.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Amount (Ksh)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  required
                  style={inputStyle}
                />
              </div>
            </div>
            <button type="submit" style={primaryButtonStyle}>
              <FiPlus /> Add Fee Structure
            </button>
          </form>
          <div style={{overflowX: 'auto'}}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Grade</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Term</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {feeStructures.map((structure) => (
                  <tr key={structure.id}>
                    <td style={tdStyle}>{structure.grade}</td>
                    <td style={tdStyle}>{structure.category}</td>
                    <td style={tdStyle}>{structure.term}</td>
                    <td style={tdStyle}>Ksh{structure.amount.toFixed(2)}</td>
                    <td style={tdStyle}>
                      <button 
                        onClick={() => deleteFeeStructure(structure.id)} 
                        style={dangerButtonStyle}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* School Expenditures Section */}
        <section style={wideCardStyle}>
          <h2 style={{...headingStyle, fontSize: '1.25rem', justifyContent: 'flex-start'}}>
            <FiDollarSign /> School Expenditures
          </h2>
          <form onSubmit={addExpenditure} style={formStyle}>
            <div style={formRowStyle}>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Expense Name</label>
                <input
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="e.g., Textbooks"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Category</label>
                <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                style={selectStyle}
              >
                <option value="">Select Category</option>
                <option value="Utilities">Utilities</option>
                <option value="Suppliers">Suppliers</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Salaries">Salaries</option>
                <option value="Rent">Rent</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Other">Other</option>
              </select>
              </div>
            </div>
            <div style={formRowStyle}>
              <div style={{...formGroupStyle, flex: 1}}>
                <label>Amount (Ksh)</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  required
                  style={inputStyle}
                />
              </div>
            </div>
            <button type="submit" style={primaryButtonStyle}>
              <FiPlus /> Add Expenditure
            </button>
          </form>
          <div style={{overflowX: 'auto'}}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Expense</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenditures.map((expense) => (
                  <tr key={expense.id}>
                    <td style={tdStyle}>{expense.date}</td>
                    <td style={tdStyle}>{expense.name}</td>
                    <td style={tdStyle}>{expense.category}</td>
                    <td style={tdStyle}>Ksh{expense.amount.toFixed(2)}</td>
                    <td style={tdStyle}>
                      <button 
                        onClick={() => deleteExpenditure(expense.id)} 
                        style={dangerButtonStyle}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeeManagement;