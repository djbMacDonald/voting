class Voter < ActiveRecord::Base
  has_many :votes, dependent: :destroy
  has_many :candidates, through: :votes

  accepts_nested_attributes_for :votes
  validates :name, :googleID, :email, uniqueness: true

end
