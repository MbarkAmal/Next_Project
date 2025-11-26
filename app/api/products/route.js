import { products } from "@/app/data/products";
import dbConnect from "@/lib/db";

import Product from "@/models/Product";
import { AwardIcon } from "lucide-react";


export async function GET() {
    await dbConnect();
    const products = await Product.find();
    return Response.json(products);

    
}

export async function  Post(req) {
    await dbConnect ();
    const body = await  req.json();
    const products = await Product.create(body);
    return Response.json(products);

    
}

// nour == 6  halim== 1