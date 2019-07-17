class PostsController < ApplicationController
	before_action :set_params, only: [:update, :destroy]

	def index
		@posts = Post.all
		render json: @posts
	end

	def create
		@post = Post.create(post_params)
		render json: @post
	end

	def update
		@post.update(post_params)
		if @post.save
			render json: @post, status: :accepted
		else
			render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
		end
	end

	def destroy
		puts @post
		@post.destroy
	end

	private

	def post_params
		params.require(:post).permit!
	end

	def set_params
		@post = Post.find(params[:id])
	end
end
