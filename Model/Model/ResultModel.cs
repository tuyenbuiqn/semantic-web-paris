namespace Model.Model
{
    public class ResultModel<T>
    {
        public ResultModel()
        {
            IsError = false;
            Message = string.Empty;
        }

        public ResultModel(bool isError, string message, T data)
        {
            IsError = isError;
            if (isError)
            {
                Message = string.Format("{0}", message);
            }
            else
            {
                Message = message;
                Data = data;
            }
        }
        public ResultModel(bool isError,string errorMessage, string message, T data)
        {
            IsError = isError;
            if (isError)
            {
                Message = string.Format("{0}: {1}",errorMessage, message);
            }
            else
            {
                Message = message;
                Data = data;
            }
        }
        public T Data { get; set; }
        public bool IsError { get; set; }
        public string Message { get; set; }
    }

    public class Result<T>
    {
        public Result()
        {
            ErrorCode = 0;
            Message = string.Empty;
        }
        
        public T Data { get; set; }
        public int ErrorCode { get; set; }
        public string Message { get; set; }
    }
}
