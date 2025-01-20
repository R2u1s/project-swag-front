import { api } from "../../../utils/api";
import { ApiError } from "../../../utils/api";

interface IPrintOptions {
  [key:string]:string;
}

export async function getPrintOptions(id:string): Promise<IPrintOptions> {
  console.log("AAAA");
  const res = await api.getInstance().get(`/catalog/print_options/${id}`);
  if (res.data){
    console.log("AAAA", res.data);
      return res.data as IPrintOptions
  }

  throw new ApiError("Неизвестная ошибка")
}
