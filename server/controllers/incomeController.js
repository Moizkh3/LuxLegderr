import xlsx from 'xlsx'
import Income from "../models/Income.js";


// Add Income Source User
export const addIncome = async (req, res) => {

    const userId = req.user.id;

    try {

        const { icon, source, amount, date } = req.body;

        //Validation: check for missing fields
        if (!source || !amount || !date) {

            return res.status(400).json({ message: "All fields are required" })
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();

        res.status(200).json(newIncome)

    } catch (error) {

        res.status(500).json({ message: "Server Error" });

    }
}

// Get all Income Source 
export const getAllIncome = async (req, res) => {

    console.log("getAllIncome hit");
    console.log("req.user:", req.user);

    const userId = req.user._id;  // use _id directly from mongoose doc

    console.log("userId:", userId);

    try {

        const income = await Income.find({ userId }).sort({ date: -1 });

        console.log("income found:", income.length);

        res.json(income);

    } catch (error) {
        console.error("getAllIncome error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Income Source User
export const deleteIncome = async (req, res) => {

    console.log("deleteIncome hit, params:", req.params);

    try {

        const income = await Income.findByIdAndDelete(req.params.id);

        if (!income) {
            console.log("Income not found for deletion");
            return res.status(404).json({ message: "Income not found" });
        }

        console.log("Income deleted successfully");
        res.json({ message: "Income deleted successfully" })

    } catch (error) {
        console.error("deleteIncome error:", error);
        res.status(500).json({ message: "Server Error", error: error.message })
    }

}

// Donwload Excel sheet
export const downloadIncomeExcel = async (req, res) => {

    const userId = req.user.id;

    try {
        
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx')

    } catch (error) {
        
        res.status(500).json({ message: "Server Error" })

    }

} 