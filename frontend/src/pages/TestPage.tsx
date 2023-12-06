import { useGetAllUsersQuery } from "../redux/features/usersApi";

function TestPage() {

    const {data} = useGetAllUsersQuery();

    console.log(data);
    
    return ( 
        <h1>TestPage</h1> 
    );
}

export default TestPage;