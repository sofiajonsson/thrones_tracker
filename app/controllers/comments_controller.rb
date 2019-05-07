class CommentsController < ApplicationController
	before_action :set_params, only: [:update]

	def index
		@comments = Comment.all
		render json: @comments
	end

	def update
		@comment.update(comment_params)
		if @comment.save
			render json: @comment, status: :accepted
		else
			render json: { errors: @comment.errors.full_messages }, status: :unprocessible_entity
		end
	end

	private

	def comment_params
		params.require(:comment).permit!
	end

	def set_params
		@comment = Comment.find(params[:id])
	end
end
