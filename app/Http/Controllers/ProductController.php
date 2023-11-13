<?php

namespace App\Http\Controllers;

use App\Helpers\ErrorHandler;
use App\Helpers\FileHelper;
use App\Helpers\HttpResponse;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;

class ProductController extends Controller
{
	public function index()
	{
		try {
			$this->authorize('viewAny', Product::class);
			return ProductResource::collection(Product::all());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar produto');
		}
	}

	public function store(ProductCreateRequest $request)
	{
		try {
			$photo = null;
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/products');
			}
			$createdProduct = Product::create([
				'name' => trim($request->name),
				'bar_code' => $request->bar_code,
				'photo' => $photo,
				'product_id' => $request->product_id,
				'category_id' => $request->category_id,
				'price' => $request->price,
				'supplier_id' => $request->supplier_id,
				'color' => $request->color,
				'size' => $request->size,
				'min_stock' => $request->min_stock,
				'max_stock' => $request->max_stock,
				'purchase_price' => $request->purchase_price,
				'selling_price' => $request->selling_price,
				'user_id' => User::currentUserId()
			]);
			return HttpResponse::success(data: new ProductResource($createdProduct));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao cadastrar produto' . $th->getMessage());
		}
	}

	public function update(ProductUpdateRequest $request, Product $product)
	{
		try {
			if (FileHelper::isUploadable($request->photo)) {
				$photo = FileHelper::uploadBase64($request->photo, 'uploads/products');
				if ($product->photo) {
					FileHelper::delete($product->photo);
				}
				$product->photo = $photo;
			}
			$product->name = trim($request->name);
			$product->bar_code = $request->bar_code;
			$product->price = $request->price;
			$product->category_id = $request->category_id;
			$product->supplier_id = $request->supplier_id;
			$product->color = $request->color;
			$product->size = $request->size;
			$product->min_stock = $request->min_stock;
			$product->max_stock = $request->max_stock;
			$product->purchase_price = $request->purchase_price;
			$product->selling_price = $request->selling_price;
			$product->user_id_update = User::currentUserId();
			$product->save();
			return HttpResponse::success(data: new ProductResource($product));
		} catch (\Throwable $th) {
			return HttpResponse::error(message: 'Erro ao actualizar produto' . $th->getMessage());
		}
	}

	public function count()
	{
		try {
			$this->authorize('viewAny', Product::class);
			return HttpResponse::success(data: Product::count());
		} catch (\Throwable $th) {
			return ErrorHandler::handle(exception: $th, message: 'Erro ao consultar produto');
		}
	}

	public function destroy(Product $product)
	{
		try {
			$this->authorize('delete', $product);

			$photo = $product->photo;
			$product->delete();

			if ($photo) {
				FileHelper::delete($photo);
			}
			return HttpResponse::success(message: 'Produto excluída com sucesso');
		} catch (\Throwable $th) {
			return ErrorHandler::handle(
				exception: $th,
				message: 'Erro ao excluir produto',
				messagePermission: 'Não tem permissão para excluir produto'
			);
		}
	}
}
