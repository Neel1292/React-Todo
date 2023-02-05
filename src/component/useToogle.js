const  UseToogle = (type,message) => {
    return `toast.${type}(${message}, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })`;
}

export default UseToogle;