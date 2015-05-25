class VotesController < ApplicationController
  before_action :authenticate_user!

  def winner
    candidates = Candidate.all
    @total = Voter.all.length
    candArr = []
    candidates.each do |candidate|
      candArr << candidate.name
    end
    findWinner(candArr)
  end


  private

  def findWinner(array)
    findLAL(array)
    if @leader[1] > 0.5 * @total
      render json: @leader
    else
      array.delete(@lagger[0])
      findWinner(array)
    end
  end

  def findLAL(array)
    candHash = {}
    array.each do |name|
      cand = Candidate.where(name: name)[0]
      candHash[cand.name] = 0
    end
    Voter.all.each do |voter|
      i = 0
      votes = voter.votes.all
      until array.include?(votes[i].candidate.name) do
        i += 1
      end
      candHash[votes[i].candidate.name] += 1
    end
    @leader = candHash.max_by{|k,v| v}
    @lagger = candHash.min_by{|k,v| v}

  end

end
