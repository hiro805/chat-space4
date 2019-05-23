class Group < ApplicationRecord
  has_many :users, thruogh: :members
  has_many :messages
  has_many :members
end

