class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :comment
end
