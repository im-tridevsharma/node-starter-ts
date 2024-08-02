interface ApiResponse {
  status: "success" | "failure";
  statusCode: number;
  message: string;
  data?: object | null;
}

export default ApiResponse;
