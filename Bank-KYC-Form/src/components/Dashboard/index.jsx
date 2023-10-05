import Header from "components/Dashboard/Header";
import Form from "components/Dashboard/KycForm";

const Dashboard = () =>
    <div className="flex flex-col items-center justify-center w-full dashboard font-primary">
        <Header />
        <Form />
    </div>;

export default Dashboard;