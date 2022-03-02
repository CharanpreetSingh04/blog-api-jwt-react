import React, { useEffect, useRef,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
function Dashboard(){
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([])
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              token: "Bearer " + token
            }
        };
        axios.get('http://localhost:5000/blogs',config).then(function (response) {
            setBlogs(response.data.blogs);
            if(response.status === 403){
                navigate('/login')
            }
            else{
                console.log('coming in else part')
            }
        }).catch(function (error) {
                console.log(error)
        });
    },[])
    const inputTitleRef = useRef();
    const inputDescriptionRef = useRef();
    const user = JSON.parse(localStorage.getItem('user')).user

    const listItems = blogs.map((blog) =>
        <div>
            <div className='item' key={blog._id}>
                <h2>{blog.name}</h2>
                <div>{blog.description}</div>
                <div style ={{textAlign: "right"}}>
                    <h5>{blog.user}</h5>
                    <h6>{blog.time}</h6>
                </div>
            </div> 
            <hr/>
        </div>
    );
    const logoutUser = () => {
        localStorage.setItem('token','')
        localStorage.setItem('user','')
        navigate('/')
    }

    const postBlog = () => {
        const data = {
            name: inputTitleRef.current.value,
            description: inputDescriptionRef.current.value,
            user: user.name,
            userId: user._id,
            time: new Date().getHours() +":"+ new Date().getMinutes() + ' ' + new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
        }
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              token: "Bearer " + localStorage.getItem('token')
            }
        };
        axios.post('http://localhost:5000/blogs',data,config).then(function (response) {
            // localStorage.setItem('token', response.data.token);
            console.log(response)
            navigate('/dashboard');
            
        }).catch(function (error) {
                console.log(error)
        });
    }
    return(
        <>
            <div><h4>Welcome {user.name}</h4><button onClick={logoutUser} className="btn btn-secondary">Logout</button></div>
            <div className='Dashboard'>
                <form>
                    <div className="form-group">
                    <label for="name">Blog Title</label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter title"
                        ref={inputTitleRef}
                    />
                    </div>
                    <div className="form-group">
                    <label for="description">Blog Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
                        ref={inputDescriptionRef}
                    ></textarea>
                    </div>
                    <input type="button" className="btn btn-primary btn-block" value="Post Blog" onClick={postBlog}/>
                </form>
            </div>
            <div>
                {
                    listItems
                }
            </div>
        </>
    )
}

/*{ <h1 class="mt-4">Dashboard</h1>
<p class="lead mb-3">Welcome {{name}}</p>

<a href="/users/logout" class="btn btn-secondary">Logout</a>
{{#if success_msg.length}}
    <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{success_msg}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
{{/if}}
{{#if error_msg.length}}
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
            {{error_msg}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
{{/if}}

<form action="/users/messages" method="POST">
        <div class="form-group">
          <label for="name">Blog Title</label>
          <input
            type="name"
            id="name"
            name="name"
            class="form-control"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group">
          <label for="description">Blog Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            class="form-control"
            placeholder="Enter Description"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          Post Blog
        </button>
</form>
<div style="margin-top: 100px;">

</div>
{{#each messages}}
        <div style="text-decoration:none;text-align:center;margin-top: 30px;" class="alert alert-warning fade show"  role="alert" >
                    <h1>{{this.name}}</h1>

        </div>
        <div style="text-align: right;">
            <h5>{{this.user}}</h5>
            <h6>{{this.time}}</h6>
        </div>
        <div style="text-decoration:none" class="alert alert-success fade show"  role="alert" >
                    {{this.description}}

        </div>
        <a href="/users/comments/{{this._id}}" class="btn btn-secondary">Comments</a>    
    <hr/>
{{/each}} }*/

export default React.memo(Dashboard);
