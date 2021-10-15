import Layout from "../../components/Layout/Layout";
import styles from "./UserAccounts.module.css"

const UsersPage: React.FunctionComponent = () => {
    return(
        <Layout title='Users'>
            <div className={styles['container']}>
            <h1>User Accounts</h1>
            </div>
        </Layout>
    );
}

export default UsersPage;