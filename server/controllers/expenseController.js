import xlsx from 'xlsx'
import Expense from "../models/Expense.js";


// Add Expense Source User
export const addExpense = async (req, res) => {

    const userId = req.user._id;

    try {

        const { icon, category, amount, date } = req.body;

        //Validation: check for missing fields
        if (!category || !amount || !date) {

            return res.status(400).json({ message: "All fields are required" })
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();

        res.status(200).json(newExpense)

    } catch (error) {

        console.error("addExpense error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });

    }
}

// Get all Expense Source 
export const getAllExpense = async (req, res) => {

    console.log("getAllExpense hit");
    console.log("req.user:", req.user);

    const userId = req.user._id;  // use _id directly from mongoose doc

    console.log("userId:", userId);

    try {

        const expense = await Expense.find({ userId }).sort({ date: -1 });

        console.log("expense found:", expense.length);

        res.json(expense);

    } catch (error) {
        console.error("getAllExpense error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Expense Source User
export const deleteExpense = async (req, res) => {

    console.log("deleteExpense hit, params:", req.params);

    try {

        const expense = await Expense.findByIdAndDelete(req.params.id);

        if (!expense) {
            console.log("expense not found for deletion");
            return res.status(404).json({ message: "Expense not found" });
        }

        console.log("Expense deleted successfully");
        res.json({ message: "Expense deleted successfully" })

    } catch (error) {
        console.error("deleteExpense error:", error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }

}

// Donwload Excel sheet
export const downloadExpenseExcel = async (req, res) => {

    const userId = req.user._id;

    try {

        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Use a buffer or temporary file for downloads in a real app, 
        // but for now we follow the user's pattern
        const fileName = `expense_details_${Date.now()}.xlsx`;
        xlsx.writeFile(wb, fileName);
        res.download(fileName);

    } catch (error) {
        console.error("downloadExpenseExcel error:", error);
        res.status(500).json({ message: "Server Error", error: error.message })

    }

} 