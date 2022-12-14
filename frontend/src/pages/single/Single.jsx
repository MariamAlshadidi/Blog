import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";

export default function Single() {
  return (
    <div className="single row mt-2">
           <div className="col-sm-12 col-md-8 mt-2 ">
           <SinglePost />
           </div>
 
           <div className="col-sm-12  col-md-4">
           <Sidebar />
           </div>
      
    </div>
  );
}
