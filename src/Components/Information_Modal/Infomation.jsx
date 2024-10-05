function Information(props){

    return(
        <>
            <div className="absolute p-6 z-50 inset-0 m-auto w-96 h-40 rounded-md gap-4 bg-blue-500 flex flex-col items-center justify-center">
                <p className="text-lg w-80 text-white break-words text-center">{props.information}</p>
                <button type="button" onClick={props.onClick} className="bg-white rounded-md h-9 w-24 font-bold">{props.name}</button>
            </div>
        </>
    )
}

export default Information;