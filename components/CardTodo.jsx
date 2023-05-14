const CardTodo = ({ todos, Next, Back, fetchData }) => {
  const clickHandler = async (id, toStatus) => {
    await fetch("/api/todo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, toStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Success") {
          fetchData();
        }
      });
  };
  return (
    <>
      {todos?.map((todo) => (
        <div key={todo._id}>
          <div className="grid gap-2">
            <div className="shadow-lg rounded-md p-3">
              <p className=" h-[100px]">{todo.title}</p>
              <div className="flex items-center justify-around">
                {Back && (
                  <button
                    onClick={(e) => clickHandler(todo._id, Back)}
                    className="border-0 outline-0 px-3 py-1 bg-orange-500 rounded text-white hover:opacity-80"
                  >
                    Back
                  </button>
                )}
                {Next && (
                  <button
                    onClick={(e) => clickHandler(todo._id, Next)}
                    className="border-0 outline-0 px-3 py-1 bg-blue-500 rounded text-white hover:opacity-80"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardTodo;
