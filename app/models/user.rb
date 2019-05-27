class User < ApplicationRecord
  has_many :groups, thruogh: :members
  has_many :messages
  has_many :members
end
