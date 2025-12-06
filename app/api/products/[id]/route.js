import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req , { params }) {
    try{
        await dbConnect();
        const { id } = await params;
        console.log(id);
        const products = await Product.findById(id);
        return Response.json({success : true , data : products});
    }catch (error){
        return Response.json({ success: false , error : error.message})
    }

    
}

export async function POST(params) {
    
}